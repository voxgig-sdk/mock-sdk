<?php
declare(strict_types=1);

// Mock SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class MockSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new MockUtility();
        $this->_utility = $utility;

        $config = MockConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = MockHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = MockHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, MockFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return MockUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = MockHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = MockHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = MockHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new MockSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = MockHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = MockHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_cart = null;

    // Idiomatic facade: $client->cart()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Cart() (PHP method
    // names are case-insensitive).
    public function cart($data = null)
    {
        require_once __DIR__ . '/entity/cart_entity.php';
        if ($data === null) {
            if ($this->_cart === null) {
                $this->_cart = new CartEntity($this, null);
            }
            return $this->_cart;
        }
        return new CartEntity($this, $data);
    }


    private $_coupon = null;

    // Idiomatic facade: $client->coupon()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Coupon() (PHP method
    // names are case-insensitive).
    public function coupon($data = null)
    {
        require_once __DIR__ . '/entity/coupon_entity.php';
        if ($data === null) {
            if ($this->_coupon === null) {
                $this->_coupon = new CouponEntity($this, null);
            }
            return $this->_coupon;
        }
        return new CouponEntity($this, $data);
    }


    private $_create_custom_resource_item = null;

    // Idiomatic facade: $client->create_custom_resource_item()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CreateCustomResourceItem() (PHP method
    // names are case-insensitive).
    public function create_custom_resource_item($data = null)
    {
        require_once __DIR__ . '/entity/create_custom_resource_item_entity.php';
        if ($data === null) {
            if ($this->_create_custom_resource_item === null) {
                $this->_create_custom_resource_item = new CreateCustomResourceItemEntity($this, null);
            }
            return $this->_create_custom_resource_item;
        }
        return new CreateCustomResourceItemEntity($this, $data);
    }


    private $_delete_custom_resource_item = null;

    // Idiomatic facade: $client->delete_custom_resource_item()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias DeleteCustomResourceItem() (PHP method
    // names are case-insensitive).
    public function delete_custom_resource_item($data = null)
    {
        require_once __DIR__ . '/entity/delete_custom_resource_item_entity.php';
        if ($data === null) {
            if ($this->_delete_custom_resource_item === null) {
                $this->_delete_custom_resource_item = new DeleteCustomResourceItemEntity($this, null);
            }
            return $this->_delete_custom_resource_item;
        }
        return new DeleteCustomResourceItemEntity($this, $data);
    }


    private $_get_custom_resource = null;

    // Idiomatic facade: $client->get_custom_resource()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias GetCustomResource() (PHP method
    // names are case-insensitive).
    public function get_custom_resource($data = null)
    {
        require_once __DIR__ . '/entity/get_custom_resource_entity.php';
        if ($data === null) {
            if ($this->_get_custom_resource === null) {
                $this->_get_custom_resource = new GetCustomResourceEntity($this, null);
            }
            return $this->_get_custom_resource;
        }
        return new GetCustomResourceEntity($this, $data);
    }


    private $_get_custom_resource_item_by_id = null;

    // Idiomatic facade: $client->get_custom_resource_item_by_id()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias GetCustomResourceItemById() (PHP method
    // names are case-insensitive).
    public function get_custom_resource_item_by_id($data = null)
    {
        require_once __DIR__ . '/entity/get_custom_resource_item_by_id_entity.php';
        if ($data === null) {
            if ($this->_get_custom_resource_item_by_id === null) {
                $this->_get_custom_resource_item_by_id = new GetCustomResourceItemByIdEntity($this, null);
            }
            return $this->_get_custom_resource_item_by_id;
        }
        return new GetCustomResourceItemByIdEntity($this, $data);
    }


    private $_patch_custom_resource_item = null;

    // Idiomatic facade: $client->patch_custom_resource_item()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias PatchCustomResourceItem() (PHP method
    // names are case-insensitive).
    public function patch_custom_resource_item($data = null)
    {
        require_once __DIR__ . '/entity/patch_custom_resource_item_entity.php';
        if ($data === null) {
            if ($this->_patch_custom_resource_item === null) {
                $this->_patch_custom_resource_item = new PatchCustomResourceItemEntity($this, null);
            }
            return $this->_patch_custom_resource_item;
        }
        return new PatchCustomResourceItemEntity($this, $data);
    }


    private $_product = null;

    // Idiomatic facade: $client->product()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Product() (PHP method
    // names are case-insensitive).
    public function product($data = null)
    {
        require_once __DIR__ . '/entity/product_entity.php';
        if ($data === null) {
            if ($this->_product === null) {
                $this->_product = new ProductEntity($this, null);
            }
            return $this->_product;
        }
        return new ProductEntity($this, $data);
    }


    private $_status = null;

    // Idiomatic facade: $client->status()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Status() (PHP method
    // names are case-insensitive).
    public function status($data = null)
    {
        require_once __DIR__ . '/entity/status_entity.php';
        if ($data === null) {
            if ($this->_status === null) {
                $this->_status = new StatusEntity($this, null);
            }
            return $this->_status;
        }
        return new StatusEntity($this, $data);
    }


    private $_update_custom_resource_item = null;

    // Idiomatic facade: $client->update_custom_resource_item()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias UpdateCustomResourceItem() (PHP method
    // names are case-insensitive).
    public function update_custom_resource_item($data = null)
    {
        require_once __DIR__ . '/entity/update_custom_resource_item_entity.php';
        if ($data === null) {
            if ($this->_update_custom_resource_item === null) {
                $this->_update_custom_resource_item = new UpdateCustomResourceItemEntity($this, null);
            }
            return $this->_update_custom_resource_item;
        }
        return new UpdateCustomResourceItemEntity($this, $data);
    }


    private $_user = null;

    // Idiomatic facade: $client->user()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias User() (PHP method
    // names are case-insensitive).
    public function user($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new MockSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
