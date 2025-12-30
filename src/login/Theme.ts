import { applyTheme } from '@cloudscape-design/components/theming';
import type { InputProps } from '@cloudscape-design/components/input';

// 自定义Input样式配置
export const customInputStyle: InputProps.Style = {
    root: {
        boxShadow: {
            focus: '0 0 0 2px #44b9d6',
        },
        borderColor: {
            focus: '#44b9d6'
        }
    }
};

// Cloudscape主题配置
export const customTheme = {
    tokens: {
        colorTextAccent: '#0073bb',
    },
    contexts: {
        'top-navigation': {
            tokens: {
                colorTextAccent: '#44b9d6',
            },
        },
    },
};

export const applyCustomTheme = () => applyTheme({ theme: customTheme });