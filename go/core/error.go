package core

type FreeDictionaryError struct {
	IsFreeDictionaryError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeDictionaryError(code string, msg string, ctx *Context) *FreeDictionaryError {
	return &FreeDictionaryError{
		IsFreeDictionaryError: true,
		Sdk:              "FreeDictionary",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeDictionaryError) Error() string {
	return e.Msg
}
