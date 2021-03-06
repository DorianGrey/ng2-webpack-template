import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of as observableOf } from "rxjs";
import translations from "../generated/translations";

class ClientLocalTranslateLoader implements TranslateLoader {
  constructor(private readonly defaultLang: string) {}

  getTranslation(lang: string): Observable<any> {
    return observableOf(translations[lang] || translations[this.defaultLang]);
  }
}

/**
 * See the discussion at: https://github.com/ocombe/ng2-translate/issues/281 for why
 * it is required to provide a loader if you want to support AoT compilation.
 * Note that this is a slightly cleaner way than the previous setup using the shared module.
 * @return {TranslateLoader} An instance of the client local loader mentioned above.
 */
export function createTranslateLoader(): TranslateLoader {
  return new ClientLocalTranslateLoader("en");
}
