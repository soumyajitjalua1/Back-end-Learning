class ApiResponse{
    constructor(statusCode, message= "Success", data){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
    static success(data, message = 'Success') {
        return new ApiResponse('success', message, data);
    }
    static error(message = 'Error', data = null) {
        return new ApiResponse('error', message, data);
    }
}
export {ApiResponse} 