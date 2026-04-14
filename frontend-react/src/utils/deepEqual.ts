// src/utils/deepEqual.ts (or add within EditVacancy.tsx)

/**
 * Performs a deep comparison between two values to determine if they are
 * structurally equivalent.
 *
 * NOTE: This is a simplified version and might not cover all edge cases
 * (e.g., Functions, Maps, Sets, Symbols, circular references).
 * It's suitable for comparing plain JSON-like data structures.
 */
export function deepEqual(obj1: any, obj2: any): boolean {
    // Check for strict equality (handles primitives, null, undefined, and same object reference)
    if (obj1 === obj2) {
        return true;
    }

    // If types are different, or one is null/undefined, they aren't equal
    if (typeof obj1 !== typeof obj2 || obj1 == null || obj2 == null) {
        return false;
    }

    // Handle Date objects
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    // Handle Arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        return true;
    }

    // Handle Objects (check constructor for plain objects)
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        if (obj1.constructor !== obj2.constructor) {
            return false; // Ensure they are the same type of object (e.g., both plain objects)
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            // Use Object.prototype.hasOwnProperty.call for safety
            if (!Object.prototype.hasOwnProperty.call(obj2, key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }

    // If none of the above, they are not deeply equal
    return false;
}