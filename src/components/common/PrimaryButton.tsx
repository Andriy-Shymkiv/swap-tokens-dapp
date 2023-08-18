import { Button, ButtonProps, styled } from '@mui/material';

const StyledPrimaryButton = styled(Button, {
  name: 'StyledPrimaryButton',
})(({ theme }) => ({
  height: 52,
  maxWidth: 240,
  backgroundColor: theme.palette.primary.light,
}));

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <StyledPrimaryButton variant={'contained'} {...props}>
      {props.children}
    </StyledPrimaryButton>
  );
};
