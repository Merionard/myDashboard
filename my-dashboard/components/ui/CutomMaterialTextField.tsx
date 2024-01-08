import TextField, {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";

export function CustomTextField(
  props: {
    variant?: TextFieldVariants;
  } & Omit<TextFieldProps, "variant">
) {
  return (
    <TextField
      {...props}
      margin="dense"
      sx={{
        "& label.Mui-focused": {
          color: "#787bff",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#787bff",
        },
        "&:hover fieldset": {
          borderColor: "#787bff",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#787bff",
        },
      }}
    />
  );
}
