import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * ApiHeaders: Interfaz que define la estructura de los encabezados HTTP
 * que se pueden enviar en las peticiones a la API.
 * Es un objeto donde las claves son los nombres de los encabezados
 * y los valores son los valores de los encabezados.
 */
interface ApiHeaders {
    [key: string]: string;
}

/**
 * get: Función asíncrona para realizar peticiones GET a una URL.
 * @param url - La URL a la que se va a realizar la petición.
 * @param headers - (Opcional) Los encabezados HTTP que se van a incluir en la petición.
 * @returns Una promesa que resuelve con los datos de la respuesta de la API.
 * @throws Lanza un error si la petición falla.
 */
async function get<T>(url: string, headers?: ApiHeaders): Promise<T> {
    // Configuración de la petición con los encabezados proporcionados.
    const config: AxiosRequestConfig = { headers };
    try {
        // Realiza la petición GET a la URL especificada con la configuración.
        const response: AxiosResponse<T> = await axios.get<T>(url, config);
        // Devuelve los datos de la respuesta.
        return response.data;
    } catch (error) {
        // Si hay un error en la petición, lo registra en la consola.
        console.error('API Error:', error);
        // Relanza el error para que pueda ser manejado por el código que llama a esta función.
        throw error;
    }
}

/**
 * post: Función asíncrona para realizar peticiones POST a una URL.
 * @param url - La URL a la que se va a realizar la petición.
 * @param data - (Opcional) Los datos que se van a enviar en el cuerpo de la petición.
 * @param headers - (Opcional) Los encabezados HTTP que se van a incluir en la petición.
 * @returns Una promesa que resuelve con los datos de la respuesta de la API.
 * @throws Lanza un error si la petición falla.
 */
async function post<T, D>(url: string, data?: D, headers?: ApiHeaders): Promise<T> {
    // Configuración de la petición con los encabezados proporcionados.
    const config: AxiosRequestConfig = { headers };
    try {
        // Realiza la petición POST a la URL especificada con los datos y la configuración.
        const response: AxiosResponse<T> = await axios.post<T>(url, data, config);
        // Devuelve los datos de la respuesta.
        return response.data;
    } catch (error) {
        // Si hay un error en la petición, lo registra en la consola.
        console.error('API Error:', error);
        // Relanza el error para que pueda ser manejado por el código que llama a esta función.
        throw error;
    }
}

export { get, post };
