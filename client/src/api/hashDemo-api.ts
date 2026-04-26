import axios from "axios";

type HashDemoHashItem = {
    hashedOutput: string;
};

type HashDemoResponse = {
    message: string;
    count: number;
    hashes: HashDemoHashItem[];
};

export const hashDemoRequest = async (input: string): Promise<HashDemoResponse> => {

    console.log(input)
    try {
        const {data} = await axios.post<HashDemoResponse>('/api/hash/demo', {input});
        console.log('Hash Result:', data);
        return data;
    } catch (error) {
        console.error('Error hashing text:', error);
        throw error;
    }



}