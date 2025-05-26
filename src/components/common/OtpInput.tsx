import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const isStyleObject = (obj: any): obj is CSSProperties => typeof obj === "object";

const getClasses = (...classes: (string | CSSProperties | boolean | undefined)[]) =>
  classes.filter((c) => !isStyleObject(c) && c !== false).join(" ");

interface SingleOtpInputProps {
  placeholder?: string;
  separator?: React.ReactNode;
  isLastChild: boolean;
  inputStyle?: CSSProperties | string;
  focus: boolean;
  isDisabled?: boolean;
  hasErrored?: boolean;
  errorStyle?: CSSProperties | string;
  focusStyle?: CSSProperties | string;
  disabledStyle?: CSSProperties | string;
  shouldAutoFocus?: boolean;
  isInputNum?: boolean;
  index: number;
  value: string;
  className?: string;
  isInputSecure?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const SingleOtpInput: React.FC<SingleOtpInputProps> = (props) => {
  const {
    placeholder,
    separator,
    isLastChild,
    inputStyle,
    focus,
    isDisabled,
    hasErrored,
    errorStyle,
    focusStyle,
    disabledStyle,
    shouldAutoFocus,
    isInputNum,
    index,
    value,
    className,
    isInputSecure,
    ...rest
  } = props;
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current && focus && shouldAutoFocus) {
      input.current.focus();
    }
  }, []);

  useEffect(() => {
    if (focus && input.current) {
      input.current.focus();
      input.current.select();
    }
  }, [focus]);

  const typeInput = useMemo(() => {
    if (isInputSecure) return "password";
    if (isInputNum) return "tel";
    return "text";
  }, [isInputSecure, isInputNum]);

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        aria-label={`${index === 0 ? "Please enter verification code. " : ""}${isInputNum ? "Digit" : "Character"
          } ${index + 1}`}
        autoComplete="off"
        style={Object.assign(
          { textAlign: "center" },
          isStyleObject(inputStyle) && inputStyle,
          focus && isStyleObject(focusStyle) && focusStyle,
          isDisabled && isStyleObject(disabledStyle) && disabledStyle,
          hasErrored && isStyleObject(errorStyle) && errorStyle
        )}
        placeholder={placeholder}
        className={getClasses(
          inputStyle,
          focus && focusStyle,
          isDisabled && disabledStyle,
          hasErrored && errorStyle
        )}
        type={typeInput}
        ref={input}
        disabled={isDisabled}
        value={value || ""}
        {...rest}
      />
      {!isLastChild && <>{separator}</>}
    </div>
  );
};

interface OtpInputProps {
  numInputs?: number;
  onChange?: (otp: string) => void;
  isDisabled?: boolean;
  shouldAutoFocus?: boolean;
  value?: string | number;
  isInputSecure?: boolean;
  placeholder?: string;
  isInputNum?: boolean;
  containerStyle?: CSSProperties | string;
  inputStyle?: CSSProperties | string;
  focusStyle?: CSSProperties | string;
  separator?: React.ReactNode;
  disabledStyle?: CSSProperties | string;
  hasErrored?: boolean;
  errorStyle?: CSSProperties | string;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface OtpInputRef {
  focusInput: (input: number) => void;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    numInputs = 4,
    onChange = (otp: string) => console.log(otp),
    isDisabled = false,
    shouldAutoFocus = false,
    value = "",
    isInputSecure = false,
    placeholder,
    isInputNum,
    containerStyle,
    inputStyle,
    focusStyle,
    separator,
    disabledStyle,
    hasErrored,
    errorStyle,
    className,
    onKeyDown,
  } = props;

  const [activeInput, setActiveInput] = useState<number>(0);

  const valueOtp = useMemo(
    () => (value ? value.toString().split("") : []),
    [value]
  );

  const valuePlaceholder = useMemo(() => {
    if (typeof placeholder === "string") {
      if (placeholder.length === numInputs) return placeholder;
      if (placeholder.length > 0) {
        console.error(
          "Length of the placeholder should be equal to the number of inputs."
        );
        return "";
      }
    }
    return "";
  }, [numInputs, placeholder]);

  useImperativeHandle(ref, () => ({ focusInput }));

  const handleOtpChange = (otp: string[]) => onChange(otp.join(""));

  const isInputValueValid = (value: string) =>
    (isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === "string") &&
    value.trim().length === 1;

  const focusInput = (input: number) =>
    setActiveInput(Math.max(Math.min(numInputs - 1, input), 0));

  const focusNextInput = () => focusInput(activeInput + 1);
  const focusPrevInput = () => focusInput(activeInput - 1);

  const changeCodeAtFocus = (value: string) => {
    const newValueOtp = [...valueOtp];
    newValueOtp[activeInput] = value[0];
    handleOtpChange(newValueOtp);
  };

  const handleOnPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    let nextActiveInput = activeInput;
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, numInputs - activeInput)
      .split("");

    const newValueOtp = [...valueOtp];

    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        newValueOtp[pos] = pastedData.shift() as string;
        nextActiveInput++;
      }
    }

    setActiveInput(nextActiveInput);
    focusInput(nextActiveInput);
    handleOtpChange(newValueOtp);
  };

  const handleOnChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (idx === 0 && value.length === numInputs) {
      handleOtpChange(value.split(""));
      return;
    }
    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
      focusNextInput();
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (e.keyCode === BACKSPACE) {
      e.preventDefault();
      changeCodeAtFocus("");
      focusPrevInput();
    } else if (e.keyCode === DELETE) {
      e.preventDefault();
      changeCodeAtFocus("");
    } else if (e.keyCode === LEFT_ARROW) {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW) {
      e.preventDefault();
      focusNextInput();
    } else if (e.keyCode === SPACEBAR) {
      e.preventDefault();
    }
  };

  const handleOnFocus = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setActiveInput(i);
    e.target.select();
  };

  const onBlur = () => setActiveInput(-1);

  return (
    <div
      style={Object.assign(
        { display: "flex" },
        isStyleObject(containerStyle) && containerStyle
      )}
      className={!isStyleObject(containerStyle) ? containerStyle : ""}
    >
      {new Array(numInputs).fill(null).map((_, i) => (
        <SingleOtpInput
          key={i}
          placeholder={valuePlaceholder[i] ?? ""}
          index={i}
          focus={activeInput === i}
          value={valueOtp[i] || ""}
          onChange={handleOnChange(i)}
          onKeyDown={handleOnKeyDown}
          onPaste={handleOnPaste}
          onFocus={handleOnFocus(i)}
          onBlur={onBlur}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          disabledStyle={disabledStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
          isInputSecure={isInputSecure}
        />
      ))}
    </div>
  );
});

export default OtpInput;
