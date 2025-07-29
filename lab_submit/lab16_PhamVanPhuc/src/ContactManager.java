import java.util.ArrayList;
import java.util.Scanner;

public class ContactManager {
    private ArrayList<Contact> contacts;
    private Scanner scanner;
    private int nextId;

    public ContactManager() {
        contacts = new ArrayList<>();
        scanner = new Scanner(System.in);
        nextId = 1;

        addSampleData();
    }

    private void addSampleData() {
        contacts.add(
                new Contact(nextId++, "Nguyen Van A", "0901234567", "nguyenvana@email.com", "123 Duong ABC, TP.HCM"));
        contacts.add(new Contact(nextId++, "Tran Thi B", "0912345678", "tranthib@email.com", "456 Duong XYZ, Ha Noi"));
        contacts.add(new Contact(nextId++, "Le Van C", "0923456789", "levanc@email.com", "789 Duong DEF, Da Nang"));
    }

    public void displayAllContacts() {
        System.out.println("\nDANH BA");
        for (Contact contact : contacts) {
            System.out.println(contact);
        }
    }

    public void searchContactByPhone() {
        System.out.print("\nNhap so dien thoai can tim: ");
        String phone = scanner.nextLine();
        Contact contact = findContactByPhone(phone);

        if (contact != null) {
            System.out.println("\nTHONG TIN LIEN LAC ===");
            System.out.println(contact);
        } else {
            System.out.println("Khong tim thay lien lac voi so dien thoai: " + phone);
        }
    }

    private Contact findContactByPhone(String phone) {
        for (Contact contact : contacts) {
            if (contact.getPhone().equals(phone)) {
                return contact;
            }
        }
        return null;
    }

    public void addNewContact() {
        System.out.println("\n=== THEM MOI LIEN LAC ===");

        System.out.print("Nhap ten: ");
        String name = scanner.nextLine();

        System.out.print("Nhap so dien thoai: ");
        String phone = scanner.nextLine();

        System.out.print("Nhap email: ");
        String email = scanner.nextLine();

        System.out.print("Nhap dia chi: ");
        String address = scanner.nextLine();

        Contact newContact = new Contact(nextId++, name, phone, email, address);
        contacts.add(newContact);

        System.out.println("Da them moi lien lac thanh cong!");
        System.out.println("Thong tin lien lac vua them:");
        System.out.println(newContact);
    }

    public void updateContact() {
        System.out.print("\nNhap ma lien lac can sua: ");
        int id = Integer.parseInt(scanner.nextLine());
        Contact contact = findContactById(id);

        if (contact != null) {
            System.out.println("Thong tin hien tai:");
            System.out.println(contact);

            System.out.println("\nNhap thong tin moi (nhan Enter de giu nguyen):");

            System.out.print("Ten (" + contact.getName() + "): ");
            String name = scanner.nextLine();
            if (!name.trim().isEmpty()) {
                contact.setName(name);
            }

            System.out.print("So dien thoai (" + contact.getPhone() + "): ");
            String phone = scanner.nextLine();
            if (!phone.trim().isEmpty()) {
                contact.setPhone(phone);
            }

            System.out.print("Email (" + contact.getEmail() + "): ");
            String email = scanner.nextLine();
            if (!email.trim().isEmpty()) {
                contact.setEmail(email);
            }

            System.out.print("Dia chi (" + contact.getAddress() + "): ");
            String address = scanner.nextLine();
            if (!address.trim().isEmpty()) {
                contact.setAddress(address);
            }

            System.out.println("Da cap nhat thong tin lien lac thanh cong!");
            System.out.println("Thong tin sau khi cap nhat:");
            System.out.println(contact);
        } else {
            System.out.println("Khong tim thay lien lac voi ma: " + id);
        }
    }

    public void deleteContact() {
        System.out.print("\nNhap ma lien lac can xoa: ");
        int id = Integer.parseInt(scanner.nextLine());
        Contact contact = findContactById(id);

        if (contact != null) {
            System.out.println("Thong tin lien lac:");
            System.out.println(contact);

            System.out.print("BBan co chac chan muon xoa? (y/n): ");
            String confirm = scanner.nextLine();

            if (confirm.equalsIgnoreCase("y") || confirm.equalsIgnoreCase("yes")) {
                contacts.remove(contact);
                System.out.println("Da xoa lien lac thanh cong!");
            } else {
                System.out.println("Da huy thao tac xoa.");
            }
        } else {
            System.out.println("Khong tim thay lien lac voi ma: " + id);
        }

    }

    private Contact findContactById(int id) {
        for (Contact contact : contacts) {
            if (contact.getId() == id) {
                return contact;
            }
        }
        return null;
    }
}
