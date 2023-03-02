import Swal from "sweetalert2";
import { Account, Frequency, Period, rgbaColor, toast } from "@nabcellent/sui-vue";
import { useAccountsStore } from "@/stores/accounts";
import { ChartOptions } from "chart.js";
import { merge } from "chart.js/helpers";

export const changeAccountActiveState = async (account: Account) => {
    const store = useAccountsStore();

    return await Swal.fire({
        titleText: 'Are you sure?',
        html: `This account will be
            <span class="text-${account.active ? 'danger' : 'success'}">
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

export const defaultLineChartOptions = (options?: ChartOptions<'line'>): ChartOptions<'line'> => merge(options, {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            border: {
                display: false
            },
            grid: {
                color: 'rgba(250, 250, 250, .1)',
            },
            ticks: {
                color: rgbaColor('#0F1B4C', 0.7),
                font: {
                    family: 'Avenir',
                    weight: 600
                }
            }
        },
        y: {
            border: {
                display: false
            },
            beginAtZero: true,
            grid: {
                lineWidth: .3
            },
            ticks: {
                color: rgbaColor('#648381', 1),
                font: {
                    family: 'Avenir',
                    weight: 600
                }
            }
        },
    },
    elements: {
        line: {
            borderWidth: 0,
            tension: .3,
            fill: true
        },
        point: {
            pointStyle: 'star',
            radius: 5,
            hoverRadius: 10
        }
    },
    plugins: {
        title: {
            padding: {
                bottom: 30
            },
            display: true,
            align: 'start',
            font: {
                size: 17
            },
            color: rgbaColor('#0F1B4C', 0.7),
        },
        legend: {
            display: false,
            labels: {
                usePointStyle: true
            }
        },
        tooltip: {
            padding: {
                x: 10,
                y: 5
            },
            displayColors: false,
        }
    }
})

export const chartSelectOptions = {
    [Period.TODAY]: [Frequency.HOURLY],
    [Period.LAST_SEVEN_DAYS]: [Frequency.DAILY],
    [Period.LAST_THIRTY_DAYS]: [Frequency.DAILY, Frequency.WEEKLY],
    [Period.LAST_THREE_MONTHS]: [Frequency.WEEKLY, Frequency.MONTHLY],
    [Period.LAST_SIX_MONTHS]: [Frequency.MONTHLY],
    [Period.YTD]: [Frequency.MONTHLY, Frequency.QUARTERLY]
}