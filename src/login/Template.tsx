import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
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
            <div data-app-header="app-header">
                <TopNavigation
                    identity={{
                        href: "#",
                        title: "",
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
                        <div className="contentPlaceholder" />
                        {children}
                    </Container>
                }
            />
            <Footer />
        </>
    );
}
