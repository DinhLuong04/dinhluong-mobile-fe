// src/types.d.ts
declare module 'react-facebook-login/dist/facebook-login-render-props' {
    import React from 'react';

    export interface ReactFacebookLoginProps {
        appId: string;
        callback: (response: any) => void;
        onFailure?: (response: any) => void;
        autoLoad?: boolean;
        fields?: string;
        scope?: string;
        onClick?: () => void;
        isDisabled?: boolean;
        language?: string;
        tag?: string | React.ComponentType<any>;
        cssClass?: string;
        version?: string;
        xfbml?: boolean;
        isMobile?: boolean;
        btnContent?: string;
        state?: string;
        responseType?: string;
        render: (props: { onClick: () => void; isProcessing: boolean; isLoaded: boolean }) => React.ReactElement;
    }

    const FacebookLogin: React.ComponentType<ReactFacebookLoginProps>;
    export default FacebookLogin;
}