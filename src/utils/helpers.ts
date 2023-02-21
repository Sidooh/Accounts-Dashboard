import Swal from "sweetalert2";
import { Account, toast } from "@nabcellent/sui-vue";
import { useAccountsStore } from "@/stores/accounts";

export const changeAccountActiveState = async (account: Account) => {
    const store = useAccountsStore();

    return await Swal.fire({
        titleText: 'Are you sure?',
        html: `This account will be
                <span class="text-${store.account.active ? 'danger' : 'success'}">
                    ${account.active ? 'DE' : ''}ACTIVATED!
                </span>`,
        backdrop: `rgba(0, 0, 150, 0.4)`,
        showLoaderOnConfirm: true,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            try {
                await store[account.active ? 'deactivate' : 'activate'](account.id)

                return true
            } catch (err: any) {
                toast({
                    titleText: `Error ${account.active ? 'Activating' : 'Deactivating'} Account`,
                    text: err?.error?.data?.message || err?.error?.error,
                    icon: 'error',
                });

                return false
            }
        }
    })
}