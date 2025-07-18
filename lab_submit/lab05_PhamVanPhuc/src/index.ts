// src/main.ts
import * as readline from "readline";
import { CourseManager } from "./services/CourseManager";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const manager = new CourseManager();

function prompt(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function mainMenu(): Promise<void> {
    while (true) {
        console.log(`
MENU QUẢN LÝ KHÓA HỌC
1. Thêm khóa học mới
2. Hiển thị danh sách khóa học
3. Cập nhật khóa học
4. Xóa khóa học
5. Thoát
`);

        const choice = await prompt("Chọn chức năng: ");

        switch (choice.trim()) {
            case "1":
                const name = await prompt("Tên khóa học: ");
                const instructor = await prompt("Giảng viên: ");
                const durationStr = await prompt("Thời lượng (giờ): ");
                manager.addCourse(name, instructor, Number(durationStr));
                break;

            case "2":
                manager.listCourses();
                break;

            case "3":
                const updateId = Number(await prompt("Nhập ID khóa học cần cập nhật: "));
                const newName = await prompt("Tên mới (bỏ qua nếu không đổi): ");
                const newInstructor = await prompt("Giảng viên mới (bỏ qua nếu không đổi): ");
                const newDurationStr = await prompt("Thời lượng mới (bỏ qua nếu không đổi): ");
                const updateData = {
                    ...(newName && { name: newName }),
                    ...(newInstructor && { instructor: newInstructor }),
                    ...(newDurationStr && { duration: Number(newDurationStr) }),
                };
                manager.updateCourse(updateId, updateData);
                break;

            case "4":
                const deleteId = Number(await prompt("Nhập ID khóa học cần xóa: "));
                manager.deleteCourse(deleteId);
                break;

            case "5":
                console.log("👋 Tạm biệt!");
                rl.close();
                process.exit(0);

            default:
                console.log("❗ Lựa chọn không hợp lệ.");
        }
    }
}

mainMenu();
