import java.util.Scanner;

public class App {
    private ContactManager contactManager;
    private Scanner scanner;

    public App() {
        contactManager = new ContactManager();
        scanner = new Scanner(System.in);
    }

    public void displayMenu() {
        String menu = """

                ===========================================
                CHUONG TRINH QUAN LY DANH BA
                1. Hien thi danh sach lien lac
                2. Tim kiem lien lac theo so dien thoai
                3. Them moi lien lac
                4. Sua thong tin lien lac
                5. Xoa thong tin lien lac
                Moi ban chon chuc nang [1->6] hoac nhan phim khac de thoat:\s""";
        System.out.print(menu);
    }

    public void handleUserChoice(String choice) {
        var result = switch (choice) {
            case "1" -> {
                contactManager.displayAllContacts();
                yield "continue";
            }
            case "2" -> {
                contactManager.searchContactByPhone();
                yield "continue";
            }

            case "3" -> {
                contactManager.addNewContact();
                yield "continue";
            }
            case "4" -> {
                contactManager.updateContact();
                yield "continue";
            }
            case "5" -> {
                contactManager.deleteContact();
                yield "continue";
            }
            default -> {
                System.out.println("Cam on ban da su dung chuong trinh!");
                yield "exit";
            }
        };

        if ("exit".equals(result)) {
            System.exit(0);
        }
    }

    public void run() {
        while (true) {
            displayMenu();
            String choice = scanner.nextLine();
            handleUserChoice(choice);
        }
    }

    public static void main(String[] args) {
        App app = new App();
        app.run();
    }
}