package core

type MockError struct {
	IsMockError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMockError(code string, msg string, ctx *Context) *MockError {
	return &MockError{
		IsMockError: true,
		Sdk:              "Mock",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MockError) Error() string {
	return e.Msg
}
