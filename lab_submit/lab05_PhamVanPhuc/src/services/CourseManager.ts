import { Course } from "../model/course";

export class CourseManager {
    private courses: Course[] = [];
    private nextId = 1;

    addCourse(name?: string, instructor?: string, duration?: number): void {
        const course = new Course(this.nextId++, name, instructor, duration);
        this.courses.push(course);
        console.log("Đã thêm khóa học thành công!");
    }

    listCourses(): void {
        if (this.courses.length === 0) {
            console.log("Không có khóa học nào.");
            return;
        }

        console.log("\nDanh sách khóa học:");
        this.courses.forEach((course, _) => {
            console.log(`${course.toString()}`);
        });
    }

    updateCourse = (id: number, newData: Partial<Course>): void => {
        const course = this.courses.find((c) => c.id === id);
        if (!course) {
            console.log("Không tìm thấy khóa học.");
            return;
        }

        const { name, instructor, duration } = newData;
        if (name) course.name = name;
        if (instructor) course.instructor = instructor;
        if (duration !== undefined) course.duration = duration;

        console.log("Đã cập nhật khóa học.");
    }

    deleteCourse(id: number): void {
        const originalLength = this.courses.length;
        this.courses = this.courses.filter((course) => course.id !== id);

        if (this.courses.length < originalLength) {
            console.log("Dã xóa khóa học.");
        } else {
            console.log("Không tìm thấy khóa học để xóa.");
        }
    }
}
