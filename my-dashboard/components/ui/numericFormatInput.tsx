import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: {
    target: { name: string; value: number | undefined };
  }) => void;
  name: string;
}
export const NumericFormatCustom = React.forwardRef<
  NumericFormatProps,
  CustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      style={{ textAlign: "right" }}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix="€"
      decimalScale={2}
      fixedDecimalScale
      defaultValue={0}
    />
  );
});
