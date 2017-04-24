export interface MLModel {
    _id: string;
    name: string;
    type: string;
    parameters: {
        alpha: number;
    };
    train_status: string;
    deploy_status: string;
    test_accuracy: string;
    created_at: number;
    updated_at: number;
}
