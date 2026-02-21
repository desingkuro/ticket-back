import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ProjectService } from "src/application/projects/services/project.service";
import { CreateProjectDto } from "src/application/projects/dto/create-project.dto";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get('')
    async findAll() {
        return [];
    }

    @Get(':id')
    async findOne() {
        return [];
    }
    
    @Post('')
    async create(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectService.create(createProjectDto);
    }
    
    @Patch(':id')
    async update() {
        return [];
    }
    
    @Delete(':id')
    async delete() {
        return [];
    }
}
