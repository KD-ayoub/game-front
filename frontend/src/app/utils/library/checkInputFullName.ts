import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import { RefObject } from "react";



export default function CheckInputFullName(fullNamelementRef: RefObject<HTMLInputElement>, class_used: string) {
    if (fullNamelementRef.current) {
        const fullNameRegex = /^(?!.*  )[A-Za-z][A-Za-z ]{4,28}[A-Za-z]$/;
        const old = class_used;
        return fullNamelementRef.current.className = fullNameRegex.test(
            fullNamelementRef.current.value
        )
            ? old
            : fullNamelementRef.current.className.concat(" border border-red-600");

    }
}