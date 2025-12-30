import Input from "@cloudscape-design/components/input";
import type { InputProps } from "@cloudscape-design/components/input";
import { customInputStyle } from "../Theme";

export default function CustomInput(props: InputProps) {
    return (
        <Input 
            {...props} 
            style={{
                ...customInputStyle,
                ...props.style
            }} 
        />
    );
}