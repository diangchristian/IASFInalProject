import { Request, Response } from "express";
import Hash from '../model/hash.model'
import { hashSHA256, generateSalt} from "../utils/hashUtils";

export const hashingDemo = async (req: Request, res: Response) => {
    
    try {
        const { inputs, input } = req.body as { inputs?: unknown; input?: unknown };

        const rawInputs = Array.isArray(inputs)
            ? inputs
            : typeof input === "string"
            ? [input]
            : null;

        if (!rawInputs || rawInputs.length === 0) {
            return res.status(400).json({ message: "inputs array is required and cannot be empty" });
        }

        const normalizedInputs = rawInputs
            .map((value) => (typeof value === "string" ? value.trim() : ""))
            .filter((value) => value.length > 0);

        if (normalizedInputs.length !== rawInputs.length) {
            return res.status(400).json({ message: "All inputs must be non-empty strings" });
        }

        const hashesToStore = normalizedInputs.map((value) => {
            const salt = generateSalt();
            const hashedOutput = hashSHA256(value, salt);
            
            return {
                inputPreview: value,
                hashedOutput,
            };
        });

        const storedHashes = await Hash.insertMany(hashesToStore);

        return res.status(200).json({
            message: "Hashing successful",
            count: storedHashes.length,
            hashes: storedHashes,
        });

    } catch (error) {
        res.status(500).json({message: "Error occurred while hashing"})
    }

}
