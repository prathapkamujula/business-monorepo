import {adminService} from "../src/services/admin.service";


// Note:
// Run this script to create an admin user
// npx ts-node create-admin.ts
async function main() {
    try {
        const admin = await adminService.createAdmin({
            email: 'kprathapreddy1997@gmail.com',
            name: 'System Admin',
            role: 'SUPERADMIN' // Optional
        });
        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

main();