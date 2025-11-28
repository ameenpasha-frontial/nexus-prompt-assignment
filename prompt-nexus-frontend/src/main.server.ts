import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { PromptLibraryComponent } from './app/prompt-library/prompt-library.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(PromptLibraryComponent, config, context);

export default bootstrap;