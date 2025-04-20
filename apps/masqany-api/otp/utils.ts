export const generateAlphanumericRandomOtp = (otpLength: number) => {
  const alphaString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let len = 0;
  const otp = [];
  while (len < otpLength) {
    const val = alphaString[Math.floor(Math.random() * 10)];
    if (val) {
      otp.push(val.toString());
      len++;
    }
  }
  return otp.join('');
};
