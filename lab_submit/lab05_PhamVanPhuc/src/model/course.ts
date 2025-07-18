export class Course {
    constructor(
        public id: number,
        public name: string = "No name",
        public instructor: string = "Unknown",
        public duration: number = 0
    ) { }

    toString(): string {
        return `[ID: ${this.id}] ${this.name} - ${this.instructor} - ${this.duration} giờ`;
    }
}
