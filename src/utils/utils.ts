
export const pluralize = (count: number, v1: string, v2: string, v3: string) => {
    return (20 >= count && count >= 5) ? v3 : ((count % 10) == 1) ? v1 : (4 >= (count % 10) && (count % 10) >= 2) ? v2 : v3
}

// if (20 >= count && count >= 5) return v3
// count %= 10
// if (count == 1) return v1
// if (4 >= count && count >= 2) return v2
// return v3