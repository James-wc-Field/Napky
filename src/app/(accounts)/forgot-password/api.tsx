import { resetPassword, ResetPasswordOutput, ConfirmResetPasswordInput, confirmResetPassword} from "aws-amplify/auth";
export async function forgotPassword(email: string) {
try{
    const result = await resetPassword({username:email});
    console.log(result);
    handleResetPasswordNextSteps(result);
    return result;
}catch(error){
    console.log(error);
}

}

function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    default:
        console.log(nextStep.resetPasswordStep);
    }
  }

  async function handleConfirmResetPassword({
    username:email,
    confirmationCode,
    newPassword
  }: ConfirmResetPasswordInput) {
    try {
      await confirmResetPassword({ username:email, confirmationCode, newPassword });
    } catch (error) {
      console.log(error);
    }
  }