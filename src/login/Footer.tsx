import { Box } from "@cloudscape-design/components";

export default function Footer() {
    return (
        <footer data-app-footer="app-footer">
            <Box padding="l" textAlign="right" variant="div" nativeAttributes={{
                style: { borderTop: "1px solid #e9ebed" }
            }}>
                <Box variant="small" color="text-body-secondary">
                    © 2025 Your Company. All rights reserved.
                </Box>
            </Box>
        </footer>
    );
}
