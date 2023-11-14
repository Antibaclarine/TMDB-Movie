import { BASE_URL, ACCESS_TOKEN } from "@/app/config";

interface ApiFetchProps {
    path: string;
}

export async function GET(apiProps: ApiFetchProps) {
    try {
        const response = await fetch(`${BASE_URL}${apiProps.path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
