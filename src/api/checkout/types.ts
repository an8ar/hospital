export type SendVerificationResponse={
    verificationId:string,
    isVerified: boolean
}
export type SendVerificationRequest={
    countryCode:string,
    phone: string
}

export type ConfirmVerificationRequest={
    code: string,
    verificationId: string
}

export type ConfirmVerificationResponse=Omit <SendVerificationResponse, 'verificationId'>
