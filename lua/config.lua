-- Mock SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Mock",
      slug = "mock",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.jsoning.com/mock",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["cart"] = {},
        ["coupon"] = {},
        ["create_custom_resource_item"] = {},
        ["delete_custom_resource_item"] = {},
        ["get_custom_resource"] = {},
        ["get_custom_resource_item_by_id"] = {},
        ["patch_custom_resource_item"] = {},
        ["product"] = {},
        ["status"] = {},
        ["update_custom_resource_item"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["cart"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Cart ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "items",
            ["short"] = "Items in the cart",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "cart",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/carts",
                ["parts"] = {
                  "public",
                  "carts",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["coupon"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["short"] = "Coupon code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "discount",
            ["short"] = "Discount amount or percentage",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Coupon ID",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "coupon",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/coupons",
                ["parts"] = {
                  "public",
                  "coupons",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["create_custom_resource_item"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "create_custom_resource_item",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/{resource}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["resource"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["delete_custom_resource_item"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "delete_custom_resource_item",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "resource",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/{resource}/{id}",
                ["parts"] = {
                  "{resource}",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "resource",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_custom_resource"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_custom_resource",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{resource}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["resource"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_custom_resource_item_by_id"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_custom_resource_item_by_id",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "resource",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{resource}/{id}",
                ["parts"] = {
                  "{resource}",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "resource",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["patch_custom_resource_item"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "patch_custom_resource_item",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "resource",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/{resource}/{id}",
                ["parts"] = {
                  "{resource}",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "resource",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["product"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Product ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Product name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "price",
            ["short"] = "Product price",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "product",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/products",
                ["parts"] = {
                  "public",
                  "products",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/products/{id}",
                ["parts"] = {
                  "public",
                  "products",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["status"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/status/{code}",
                ["parts"] = {
                  "public",
                  "status",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["code"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/status",
                ["parts"] = {
                  "public",
                  "status",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["update_custom_resource_item"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "update_custom_resource_item",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "resource",
                      ["orig"] = "resource",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/{resource}/{id}",
                ["parts"] = {
                  "{resource}",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "resource",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["short"] = "User email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "User ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "username",
            ["short"] = "Username",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "user",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/public/users",
                ["parts"] = {
                  "public",
                  "users",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
