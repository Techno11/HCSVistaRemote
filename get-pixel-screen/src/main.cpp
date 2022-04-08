#include <node.h>
#include <windows.h>
#include <stdio.h>
#include <iostream>

namespace pixel
{

    using v8::Exception;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::NewStringType;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;

    // This is the implementation of the "getPixel" method
    // Input arguments are passed using the
    // const FunctionCallbackInfo<Value>& args struct
    void getPixel(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();

        // Check the number of arguments passed.
        if (args.Length() < 2)
        {
            // Throw an Error that is passed back to JavaScript
            isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate,
                                    "Wrong number of arguments",
                                    NewStringType::kNormal)
                    .ToLocalChecked()));
            return;
        }

        // Check the argument types
        if (!args[0]->IsNumber() || !args[1]->IsNumber())
        {
            isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate,
                                    "Wrong arguments",
                                    NewStringType::kNormal)
                    .ToLocalChecked()));
            return;
        }

        int x = args[0].As<Number>()->Value();
        int y = args[1].As<Number>()->Value();
        HDC dc = GetDC(NULL);
        COLORREF color = GetPixel(dc, x, y);

        Local<Number> num = Number::New(isolate, color);

        // Set the return value (using the passed in
        // FunctionCallbackInfo<Value>&)
        args.GetReturnValue().Set(num);
    }

    void Init(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "getPixel", getPixel);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
} // namespace pixel