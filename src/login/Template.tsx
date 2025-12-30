import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import CustomInput from "./components/CustomInput";
import CustomTopNavigation from "./components/CustomTopNavigation";
import {
    AppLayout,
    BreadcrumbGroup,
    Container,
    Flashbar,
    Header,
    HelpPanel,
    SideNavigation,
    SplitPanel,
    TopNavigation
} from "@cloudscape-design/components";
import Footer from "./Footer";
import { applyCustomTheme } from "./Theme";
import "./main.css";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
        
        // Add CSP meta tag to support inline stylesheets
        const metaCSP = document.createElement('meta');
        metaCSP.httpEquiv = 'Content-Security-Policy';
        metaCSP.content = "style-src 'self' 'unsafe-inline';";
        document.head.appendChild(metaCSP);
        
        // Apply custom theme
        const themeReset = applyCustomTheme();
        
        return () => {
            document.head.removeChild(metaCSP);
            themeReset.reset();
        };
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <>
            <div data-app-header="app-header" style={{ height: '80px', minHeight: '80px' }}>
                <CustomTopNavigation
                    identity={{
                        href: "#",
                        title: "Application",
                        logo: {
                            src: "/logo-small-top-navigation.svg",
                            alt: "Application"
                        }
                    }}
                />
            </div>
            <AppLayout
                headerSelector="[data-app-header='app-header']"
                footerSelector="[data-app-footer='app-footer']"
                navigationHide={true}
                toolsHide={true}
                content={
                    <Container
                        header={
                            <Header variant="h2" description={headerNode}>
                                {headerNode}
                            </Header>
                        }
                    >
                        <form onSubmit={e => e.preventDefault()}>
                            <Form
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        <Button formAction="none" variant="link">
                                            Cancel
                                        </Button>
                                        <Button variant="primary">Submit</Button>
                                    </SpaceBetween>
                                }
                                header={<Header variant="h1">Form header</Header>}
                            >
                                <Container header={<Header variant="h2">Form container header</Header>}>
                                    <SpaceBetween direction="vertical" size="l">
                                        <FormField label="First field">
                                            <CustomInput value={""} />
                                        </FormField>
                                        <FormField label="Second field">
                                            <CustomInput value={""} />
                                        </FormField>
                                        <FormField label="Third field">
                                            <CustomInput value={""} />
                                        </FormField>
                                    </SpaceBetween>
                                </Container>
                            </Form>
                        </form>
                        {children}
                    </Container>
                }
            />
            <Footer />
        </>
    );
}
