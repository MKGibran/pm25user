import { createContext, MouseEvent, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { MRT_Cell } from 'material-react-table'
import { ButtonBase, MenuItem, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'

import { ResponseGetAllDefault } from './default'
import { PlaceRes, VillageRes } from './regional'

import MoleculeStatusVisual, {
  StatusPMDataList,
} from '../../components/ui/molecule/MoleculeStatusVisual'
import { interpretPMVal } from '../../utils/helper/InterpretPMVal'
import { optionsDate, optionsTime } from '../../utils/helper/dateHelper'
import ToTitleCase from '../../utils/helper/ToTitleCase'
import { INPUT_STYLING } from '../../config/themes'
import AtomInputField from '../../components/ui/atom/AtomInputField'
import useFetchPmData from '../../utils/hooks/useFetchPmData'
import { Controller, useForm } from 'react-hook-form'

export type PmColumnName =
  | 'id'
  | 'datetime'
  | 'value'
  | 'created_at'
  | 'updated_at'
  | 'village_code'
  | 'district_code'
  | 'city_code'
  | 'province_code'
  | 'status'

export interface GetPmQueryProps extends Object {
  size: 5 | 10 | 15 | 20 | 25 | 30 | 35 | 50 | 100
  page: number
  timezone?: 'Asia/Jakarta' | 'Asia/Brunei' | 'Asia/Seoul'
  startDate?: string
  endDate?: string
  exactDate?: string
  villageCode?: string
  districtCode?: string
  cityCode?: string
  provinceCode?: string
  minValue?: number
  exactValue?: number
  maxValue?: number
  sortBy: PmColumnName
  sortOrder: 'asc' | 'desc'
  [key: string]: any
}

export interface DashboardData extends Object {
  id: number
  datetime: string
  value: number
  created_at: string
  updated_at: string
  village: VillageRes
  district: PlaceRes
  city: PlaceRes
  province: PlaceRes
}

export type DashboardRes = ResponseGetAllDefault & {
  data: {
    data: DashboardData[]
  }
}

export const columnsList: DashboardData[] | Object[] = [
  {
    header: 'Tanggal',
    accessorKey: 'datetime',
    Cell: ({ row }: MRT_Cell<DashboardData>) =>
      new Date(row.original.datetime as string).toLocaleDateString('id-ID', optionsDate),
    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { pmGetAll, pmFilter } = useFetchPmData()

      const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
      const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        column.getFilterValue() as Date,
      )

      const handleClose = () => {
        setAnchorEl(null)
      }

      const fetchFilterData = (date: Date | undefined) => {
        const isEqualDate = date?.toString() === selectedDate?.toString()

        setSelectedDate(isEqualDate === true ? undefined : date)
        column.setFilterValue(!isEqualDate ? format(date!, 'yyyy-MM-dd') : null)

        handleClose()
      }

      const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
      }

      return (
        <>
          <ButtonBase disableRipple onClick={handleOpen}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              value={
                selectedDate === undefined
                  ? 'Pilih Tanggal'
                  : format(selectedDate, 'dd MMM yyyy', {
                      locale: id,
                    })
              }
              inputProps={{ readOnly: true }}
              lang="id"
              sx={INPUT_STYLING}
            />
          </ButtonBase>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ mt: 2 }}
          >
            <DayPicker
              mode="single"
              required
              toDate={new Date()}
              selected={selectedDate}
              onSelect={(date: Date | undefined) => {
                fetchFilterData(date)
              }}
            />
          </Popover>
        </>
      )
    },
    size: 5,
  },
  {
    header: 'Waktu',
    Cell: ({ row }: MRT_Cell<DashboardData>) =>
      new Date(row.original.datetime).toLocaleTimeString('id-ID', optionsTime),
    size: 5,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    size: 120,
    enableEditing: false,
    Cell: ({ row }: MRT_Cell<DashboardData>) => {
      const status = interpretPMVal(row.original.value as number)
      return (
        <Stack direction="row" spacing={1}>
          <MoleculeStatusVisual type={status} />
          <Typography>{status}</Typography>
        </Stack>
      )
    },

    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control } = useForm()

      function interpretStatus(val: string) {
        let maxValue: number = 0
        let minValue: number = 0

        switch (val) {
          case 'Berbahaya':
            maxValue = 1000000
            minValue = 300
            break
          case 'Sangat tidak sehat':
            maxValue = 300
            minValue = 200
            break
          case 'Tidak sehat':
            maxValue = 200
            minValue = 100
            break
          case 'Sedang':
            maxValue = 100
            minValue = 50
            break
          case 'Aman':
            maxValue = 50
            minValue = 0
            break
          default:
            return
        }
        return JSON.stringify({
          maxValue,
          minValue,
        })
      }

      return (
        <Controller
          name="value"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              element={
                <Select
                  value={value}
                  onChange={(e) => {
                    onChange(e)
                    column.setFilterValue(interpretStatus(e.target.value))
                  }}
                  fullWidth
                  placeholder="Status"
                  sx={{ ...INPUT_STYLING }}
                >
                  {StatusPMDataList.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
              }
            />
          )}
        />
      )
    },
  },
  {
    header: 'Nilai',
    accessorKey: 'value',
    size: 5,
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'number',
      variant: 'outlined',
      sx: {
        ...INPUT_STYLING,
        pt: 1,
      },
    },
    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control, getValues } = useForm()
      const handleSubmit = (val: string) => {
        column.setFilterValue(val.length == 0 ? undefined : val)
      }
      return (
        <Controller
          name="valueName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              placeholder="Nilai PM"
              type="number"
              onChange={(e) => {
                onChange(e)
                let _timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                  clearTimeout(_timer)
                  handleSubmit(e.target.value)
                }, 500)
              }}
              value={value}
            />
          )}
        />
      )
    },
  },
  {
    header: 'Provinsi',
    accessorKey: 'province.id',
    Cell: ({ row }: MRT_Cell<DashboardData>) => ToTitleCase(row.original.province.name as string),
    size: 5,
    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control, getValues } = useForm()
      const handleSubmit = (val: string) => {
        column.setFilterValue(val.length == 0 ? undefined : val)
      }
      return (
        <Controller
          name="provinceName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              placeholder="Provinsi"
              onChange={(e) => {
                onChange(e)
                let _timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                  clearTimeout(_timer)
                  handleSubmit(e.target.value)
                }, 500)
              }}
              value={value}
            />
          )}
        />
      )
    },
  },
  {
    header: 'Kab/Kota',
    accessorKey: 'city.id',
    Cell: ({ row }: MRT_Cell<DashboardData>) => ToTitleCase(row.original.city.name as string),
    size: 5,
    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control, getValues } = useForm()
      const handleSubmit = (val: string) => {
        column.setFilterValue(val.length == 0 ? undefined : val)
      }
      return (
        <Controller
          name="cityName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              placeholder="Kabupaten/Kota"
              onChange={(e) => {
                onChange(e)
                let _timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                  clearTimeout(_timer)
                  handleSubmit(e.target.value)
                }, 500)
              }}
              value={value}
            />
          )}
        />
      )
    },
  },
  {
    header: 'Kecamatan',
    accessorKey: 'district.id',
    Cell: ({ row }: MRT_Cell<DashboardData>) => ToTitleCase(row.original.district.name as string),
    size: 5,
    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control, getValues } = useForm()

      const handleSubmit = (val: string) => {
        column.setFilterValue(val.length == 0 ? undefined : val)
      }

      return (
        <Controller
          name="districtName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              placeholder="Kecamatan"
              onChange={(e) => {
                onChange(e)
                let _timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                  clearTimeout(_timer)
                  handleSubmit(e.target.value)
                }, 500)
              }}
              value={value}
            />
          )}
        />
      )
    },
  },
  {
    header: 'Kelurahan/Desa',
    accessorKey: 'village.id',
    Cell: ({ row }: MRT_Cell<DashboardData>) => ToTitleCase(row.original.village.name as string),

    Filter: ({ column }: MRT_Cell<DashboardData>) => {
      const { control, getValues } = useForm()

      const handleSubmit = (val: string) => {
        column.setFilterValue(val.length == 0 ? undefined : val)
      }

      return (
        <Controller
          name="villageName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AtomInputField
              placeholder="Kelurahan/Desa"
              onChange={(e) => {
                onChange(e)
                let _timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                  clearTimeout(_timer)
                  handleSubmit(e.target.value)
                }, 500)
              }}
              value={value}
            />
          )}
        />
      )
    },
    size: 5,
  },
]
