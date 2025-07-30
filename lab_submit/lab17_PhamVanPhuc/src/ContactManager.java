import java.util.ArrayList;
import java.util.Scanner;
import java.util.Optional;
import java.util.Comparator;

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
        if (contacts.isEmpty()) {
            System.out.println("Chua co lien lac nao trong danh ba.");
            return;
        }

        contacts.stream()
                .sorted(Comparator.comparing(Contact::getName))
                .forEach(System.out::println);
    }

    public void searchContactByPhone() {
        System.out.print("\nNhap so dien thoai can tim: ");
        String phone = scanner.nextLine();

        findContactByPhone(phone)
                .ifPresentOrElse(
                        contact -> {
                            System.out.println("\nTHONG TIN LIEN LAC ===");
                            System.out.println(contact);
                        },
                        () -> System.out.println("Khong tim thay lien lac voi so dien thoai: " + phone));
    }

    private Optional<Contact> findContactByPhone(String phone) {
        return contacts.stream()
                .filter(contact -> contact.getPhone().equals(phone))
                .findFirst();
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

        var contactOpt = findContactById(id);
        if (contactOpt.isPresent()) {
            performUpdateContact(contactOpt.get());
        } else {
            System.out.println("Khong tim thay lien lac voi ma: " + id);
        }
    }

    private void performUpdateContact(Contact contact) {
        System.out.println("Thong tin hien tai:");
        System.out.println(contact);

        System.out.println("\nNhap thong tin moi (nhan Enter de giu nguyen):");

        System.out.print("Ten (" + contact.getName() + "): ");
        String name = scanner.nextLine();
        updateFieldIfNotEmpty(name, contact::setName);

        System.out.print("So dien thoai (" + contact.getPhone() + "): ");
        String phone = scanner.nextLine();
        updateFieldIfNotEmpty(phone, contact::setPhone);

        System.out.print("Email (" + contact.getEmail() + "): ");
        String email = scanner.nextLine();
        updateFieldIfNotEmpty(email, contact::setEmail);

        System.out.print("Dia chi (" + contact.getAddress() + "): ");
        String address = scanner.nextLine();
        updateFieldIfNotEmpty(address, contact::setAddress);

        System.out.println("""
                Da cap nhat thong tin lien lac thanh cong
                Thong tin sau khi cap nhat:!""");

        System.out.println(contact);
    }

    private void updateFieldIfNotEmpty(String input, java.util.function.Consumer<String> setter) {
        if (!input.trim().isEmpty()) {
            setter.accept(input);
        }
    }

    public void deleteContact() {
        System.out.print("\nNhap ma lien lac can xoa: ");
        int id = Integer.parseInt(scanner.nextLine());

        var contactOpt = findContactById(id);

        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            System.out.println("Thong tin lien lac:");
            System.out.println(contact);

            System.out.print("Ban co chac chan muon xoa? (y/n): ");
            String confirm = scanner.nextLine();

            var shouldDelete = switch (confirm.toLowerCase()) {
                case "y", "yes" -> true;
                case "n", "no" -> false;
                default -> false;
            };

            if (shouldDelete) {
                contacts.remove(contact);
                System.out.println("Da xoa lien lac thanh cong!");
            } else {
                System.out.println("Da huy thao tac xoa.");
            }
        } else {
            System.out.println("Khong tim thay lien lac voi ma: " + id);
        }
    }

    private Optional<Contact> findContactById(int id) {
        return contacts.stream()
                .filter(contact -> contact.getId() == id)
                .findFirst();
    }

}
