import test from 'node:test';
import assert from 'node:assert/strict';
import { filterCatalogue } from '../src/catalog.js';
const products = [{id:'r1',name:'Clover Ring',category:'Rings',price:200},{id:'b1',name:'Clover Bangle',category:'Bracelets',price:320},{id:'c1',name:'Chain',category:'Chains',price:150}];
test('search accepts surrounding spaces and mixed case',()=>assert.deepEqual(filterCatalogue(products,{search:'  RING  '}).map(p=>p.id),['r1']));
test('search supports category and product code',()=>assert.equal(filterCatalogue(products,{search:'b1'})[0].id,'b1'));
test('filters combine and sorting does not mutate the catalogue',()=>{const before=JSON.stringify(products);assert.deepEqual(filterCatalogue(products,{budget:'200',sort:'price-asc'}).map(p=>p.id),['c1','r1']);assert.equal(JSON.stringify(products),before);assert.equal(filterCatalogue(products,{category:'Bracelets',budget:'200'}).length,0)});
test('cleared filters restore all items',()=>assert.equal(filterCatalogue(products).length,3));
