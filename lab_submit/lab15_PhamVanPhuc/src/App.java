import java.util.Scanner;

public class App {
    private static Scanner scanner = new Scanner(System.in);
    private static int choice;
    private static double electricBill = 0;
    private static double taxiFare = 0;
    private static double netSalary = 0;
    private static double otherExpenses = 0;
    private static double totalExpenses = 0;
    private static double remainingMoney;

    public static void main(String[] args) throws Exception {

        do {
            System.out.print("Moi ban chon chuc nang tu 1 den 4 hoac bam phim bat ki de thoat: ");
            showMenu();
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    calculateElectricBill();
                    break;
                case 2:
                    calculateTaxiFare();
                    break;
                case 3:
                    calculateSalary();
                    break;
                case 4:
                    calculateTotalIncome();
                    break;
                default:
                    System.out.println("\n Cam on da su dung chuong trinh <3!");
                    break;
            }

            System.out.println();

        } while (choice >= 1 && choice <= 4);

        scanner.close();
    }

    public static void showMenu() {
        System.out.println("\nQuan ly chi tieu cuoi thang");
        System.out.println("1. Tinh tien dien cuoi thang");
        System.out.println("2. Tinh tien taxi cuoi thang");
        System.out.println("3. Tinh tien luong cuoi thang");
        System.out.println("4. Tinh tong thu nhap sau khi chi tieu cuoi thang");
    }

    public static void calculateElectricBill() {
        System.out.println("\nTinh tien dien cuoi thang");
        System.out.print("Nhap so dien su dung trong thang (kWh): ");
        double electricUsage = scanner.nextDouble();

        electricBill = electricUsage * 3000;

        System.out.printf("Tien dien cuoi thang: %.0f VND\n", electricBill);
        System.out.print("----------------------------------------------------------------------\n");
    }

    public static void calculateTaxiFare() {
        System.out.println("\nTinh tien taxi cuoi thang");
        System.out.print("Nhap quang duong di taxi (km): ");
        double distance = scanner.nextDouble();

        taxiFare = distance * 12000;
        System.out.printf("Tien taxi cuoi thang: %.0f VND\n", taxiFare);
        System.out.print("----------------------------------------------------------------------\n");
    }

    public static void calculateSalary() {
        System.out.println("\nTinh tien luong cuoi thang");
        System.out.print("Nhap luong (VND): ");
        double salary = scanner.nextDouble();

        double tax = salary * 0.15;
        netSalary = salary - tax;

        System.out.printf("Thue (15%%): %.0f VND\n", tax);
        System.out.printf("Luong nhan duoc: %.0f VND\n", netSalary);
        System.out.print("----------------------------------------------------------------------\n");
    }

    public static void calculateTotalIncome() {
        System.out.println("\nTinh tong thu nhap sau khi chi tieu cuoi thang");
        System.out.print("Nhap cac chi phi khac (VND): ");
        otherExpenses = scanner.nextDouble();

        totalExpenses = electricBill + taxiFare + otherExpenses;
        remainingMoney = netSalary - totalExpenses;

        System.out.printf("Tong thu nhap: %.0f VND\n", netSalary);
        System.out.printf("Tong chi tieu: %.0f VND\n", totalExpenses);
        System.out.printf("So tien con lai: %.0f VND\n", remainingMoney);
        System.out.print("----------------------------------------------------------------------\n");
    }
}
