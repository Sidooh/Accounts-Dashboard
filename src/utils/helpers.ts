import Swal from "sweetalert2";
import { Account, toast } from "@nabcellent/sui-vue";
import { useAccountsStore } from "@/stores/accounts";
import { ChartData, ChartOptions } from "chart.js";
import { merge } from "chart.js/helpers";
import pluralize from 'pluralize';
import { Frequency, Period } from "@/utils/enums";

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
let hexToRgb = function hexToRgb(hexValue: string): string | null {
    let hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    }));

    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(', ') : null;
};
let rgbaColor = function rgbaColor(hex: string = '#fff', alpha: number = .5) {
    return "rgba(".concat(hexToRgb(hex) ?? '0,0,0', ", ").concat(String(alpha), ")");
};

export const chartGradient = (rgbColor: number[]) => {
    let rgb = rgbColor.join()
    let gradient = document.createElement('canvas').getContext('2d')?.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, `rgba(${rgb}, .7)`);
    gradient?.addColorStop(1, `rgba(${rgb}, 0)`);

    return gradient;
}

export const defaultLineChartData = (options: ChartData<'line'>) => {
    return merge(options, {
        datasets: [{
            backgroundColor: chartGradient([14, 120, 210]),
            borderColor: ['rgba(10, 23, 39, .3)'],
            borderWidth: 2,
            tension: 0.3,
            fill: true
        }]
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
                color: rgbaColor('#900', 0.7),
                font: {
                    family: 'Noir Pro',
                    weight: 600
                }
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                lineWidth: .3
            }
        },
    },
    plugins: {
        title: {
            display: true,
            align: 'start',
            font: {
                size: 17
            },
        },
        legend: {
            display: false
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

export const plural = (word: string, count?: number, inclusive?: boolean) => pluralize(word, count, inclusive)

export const Str = {
    headline: (str: string) => {
        if (!str) return "";

        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    },
    ucFirst: (str: string) => {
        str = str.toLowerCase();

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

export const chartSelectOptions = {
    [Period.TODAY]: [Frequency.HOURLY],
    [Period.LAST_SEVEN_DAYS]: [Frequency.DAILY],
    [Period.LAST_THIRTY_DAYS]: [Frequency.DAILY, Frequency.WEEKLY],
    [Period.LAST_THREE_MONTHS]: [Frequency.WEEKLY, Frequency.MONTHLY],
    [Period.LAST_SIX_MONTHS]: [Frequency.MONTHLY],
    [Period.YTD]: [Frequency.MONTHLY, Frequency.QUARTERLY]
}