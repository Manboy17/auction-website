import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const itemSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        type: { type: "string", enum: ["laptop", "desktop", "workstation"] },
        price: { type: "number" },
        processor: { type: "string" },
        graphicsCard: { type: "string" },
        description: { type: "string" },
        endTime: { type: "string", format: "date" },
        images: {
            type: "array",
            items: {
                type: "string",
                format: "uri"
            }
        }
    },
    required: ["name", "type", "price", "processor", "graphicsCard", "description", "endTime"],
    additionalProperties: false
};

const userSchema = {
    type: "object",
    properties: {
        email: {type: "string", format: "email"},
        password: {type: "string", minLength: 4},
        isAdmin: {type: "boolean"}
    },
    required: ["email", "password"],
    additionalProperties: false
};

const bidSchema = {
    type: "object",
    properties: {
        creator: {type: "string", format: "email"},
        price: {type: "number"}
    },
    required: ["creator", "price"],
    additionalProperties: false
};

export const validateItem = ajv.compile(itemSchema);
export const validateUser = ajv.compile(userSchema);
export const validateBid = ajv.compile(bidSchema);
