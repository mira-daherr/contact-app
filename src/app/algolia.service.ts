
import { Injectable } from '@angular/core';
import { algoliasearch } from 'algoliasearch';
import { Contact } from './contact.model';

@Injectable({
    providedIn: 'root'
})
export class AlgoliaService {

    private client = algoliasearch('H2CNU96W3L', '2af69145249707486dd786f179bfb7b8');
    private indexName = 'contacts';

    async saveContacts(contacts: Contact[]) {
        const records = contacts.map(c => ({ ...c, objectID: c.id }));
        await this.client.saveObjects({
            indexName: this.indexName,
            objects: records
        });
    }

    async searchContacts(query: string): Promise<Contact[]> {
        const result = await this.client.searchSingleIndex({
            indexName: this.indexName,
            searchParams: {
                query: query,
                hitsPerPage: 50,
                attributesToHighlight: ['name', 'email', 'phone', 'address'],
                highlightPreTag: '<span class="highlight">',
                highlightPostTag: '</span>',
            }
        });
        return result.hits as unknown as Contact[];
    }

}