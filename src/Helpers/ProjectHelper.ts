import Axios, { AxiosRequestConfig } from "axios";
import { Project } from "../Models/Project";

export class ProjectHelper {
  async saveProject(project: Project) {
    try {
      let config: AxiosRequestConfig = {
        method: 'POST',
        baseURL: 'http://localhost:4003',
        url: '/project/save',
        data: {
          project
        }
      }
      let response = await Axios(config);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async loadProjects() {
    try {
      let config: AxiosRequestConfig = {
        method: 'GET',
        baseURL: 'http://localhost:4003',
        url: '/project/load'
      }

      let response = await Axios(config);
      return response.data;
    } catch (error) {

    }
  }
}