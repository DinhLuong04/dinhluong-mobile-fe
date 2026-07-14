const BASE_URL = 'https://provinces.open-api.vn/api';

export const locationService = {
    getProvinces: async () => {
        const res = await fetch(`${BASE_URL}/p/`);
        return res.json();
    },
    getDistrictsByProvince: async (provinceCode: string | number) => {
        const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
        const data = await res.json();
        return data.districts || [];
    },
    getWardsByDistrict: async (districtCode: string | number) => {
        const res = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
        const data = await res.json();
        return data.wards || [];
    }
};