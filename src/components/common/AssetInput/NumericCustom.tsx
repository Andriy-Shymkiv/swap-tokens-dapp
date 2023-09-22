import { forwardRef } from 'react';
import { NumericFormatProps, InputAttributes, NumericFormat } from 'react-number-format';

export const NumericCustom = forwardRef<
  NumericFormatProps<InputAttributes>,
  { onChange: (event: { target: { name: string; value: string } }) => void; name: string; value: string }
>(({ name, onChange, value }, ref) => (
  <NumericFormat
    style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }}
    name={name}
    value={value}
    getInputRef={ref}
    allowNegative={false}
    allowLeadingZeros={false}
    onValueChange={({ value }) => onChange({ target: { name, value } })}
    thousandSeparator
    valueIsNumericString
  />
)) as never;
