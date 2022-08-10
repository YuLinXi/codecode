#include <stdio.h>
#include "../common/seqlist.cpp"

int data[9] = {1, 2, 2, 3, 4, 4, 5, 6, 7};

void createTestData(SeqList &L) {
  for (int i = 0; i < sizeof(data) / sizeof(int); i++) {
     AddElem(L, data[i]);
  }
}

int main () {
  SeqList L;
  InitSeqList(L);
  createTestData(L);
  for (int i = 0; i < L.length; i++)
  {
    printf("%d\n", L.data[i]);
  }
}