import { Document, Schema, Model, model } from 'mongoose';

export interface SampleDocument extends Document {
    year: number;
    name: string;
    createdDate: Date;
}

export interface VehicleModel extends SampleDocument {}

export const SampleSchema: Schema = new Schema(
    {
        year: Number,
        name: String,
        createdDate: Date,
    },
    { collection: 'vehicles' }
);

SampleSchema.pre<SampleDocument>('save', async function() {
    this.createdDate = new Date();
});

export const Vehicle: Model<VehicleModel> = model<VehicleModel>('Vehicle', SampleSchema);
