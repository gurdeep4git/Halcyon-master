export class IdHelper {
    static generatePrefixedId(prefix: string, value: string | number): string {
        return `${prefix}_${value}`;
    }
    static extractId(prefixedId: string): string {
        return prefixedId.split("_").pop();
    }

    static generateUniqueId(): number {
        return -(new Date().getTime() % 10000);
    }
}
