import java.util.Scanner;

public class App {
    private ContactManager contactManager;
    private Scanner scanner;

    public App() {
        contactManager = new ContactManager();
        scanner = new Scanner(System.in);
    }

    public void displayMenu() {
        System.out.println("\n===========================================");
        System.out.println("CHUONG TRINH QUAN LY DANH BA");
        System.out.println("1. Hien thi danh sach lien lac");
        System.out.println("2. Tim kiem lien lac theo so dien thoai");
        System.out.println("3. Them moi lien lac");
        System.out.println("4. Sua thong tin lien lac");
        System.out.println("5. Xoa thong tin lien lac");
        System.out.print("Moi ban chon chuc nang [1->5] hoac nhan phim khac de thoat: ");
    }

    public void handleUserChoice(String choice) {
        switch (choice) {
            case "1":
                contactManager.displayAllContacts();
                break;
            case "2":
                contactManager.searchContactByPhone();
                break;
            case "3":
                contactManager.addNewContact();
                break;
            case "4":
                contactManager.updateContact();
                break;
            case "5":
                contactManager.deleteContact();
                break;
            default:
                System.out.println("Cam on ban da su dung chuong trinh!");
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