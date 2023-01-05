export interface PhoneVerificationSendParams {
    phone: string;
    countryCode: string;
}

export interface PhoneVerificationSendResponse {
    verificationId: string;
    isVerified: boolean;
}

export interface PhoneVerificationConfirmParams {
    verificationId: string;
    code: string;
}

export interface PhoneVerificationConfirmResponse {
    isVerified: boolean
}
