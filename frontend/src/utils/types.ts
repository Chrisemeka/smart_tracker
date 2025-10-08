export interface LoginFormData {
    email: string,
    password: string
}

export interface RegisterFormData {
    name: string,
    email: string,
    password: string
}

export interface UserData {
    id: string,
    name: string,
    email: string,
    profilePictureUrl: string
}

export interface Bucket {
    id: string,
    name: string,
    icon: string,
    description: string,
    fieldSchema: FieldSchema,
    updatedAt: Date
}

export interface BucketRecord {
    title: string,
    data: Record<string, any>,
    bucketId: string,
    createdAt: Date,
}

interface FieldDefinition {
    fieldName: string,
    fieldType: 'text' | 'date' | 'number' | 'url';
}

interface FieldSchema {
  fields: FieldDefinition[];
}

export type CreateBucketDTO = Omit<Bucket, 'id'>;