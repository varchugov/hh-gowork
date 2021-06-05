package ru.gowork;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.hibernate.Session;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;
import ru.gowork.dto.ChapterDto;
import ru.gowork.dto.ShortParagraphDto;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;
import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

@ContextConfiguration(classes = TestConfig.class)
public class ChapterResourceTest extends BaseTest {

  @Before
  public void fillDb() {
    transactionalScope.write(() -> {
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO chapters (id, name) VALUES (1, 'chapter 1')")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO chapters (id, name) VALUES (2, 'chapter 2')")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO paragraphs (id, name, chapter_id) VALUES (1, 'par 1', 1)")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO paragraphs (id, name, chapter_id) VALUES (2, 'par 2', 1)")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO paragraphs (id, name, chapter_id) VALUES (3, 'par 1', 2)")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO steps (id, paragraph_id, theory, question, correct_answers, has_answer) VALUES " +
                      "(1, 1, 'Some text theory 3', '{\"type\": \"free\"}', '[]', FALSE);")
              .executeUpdate();
      sessionFactory.getCurrentSession()
              .createNativeQuery("INSERT INTO users (email, password_hash, current_user_step) VALUES ('" + BaseTest.FAKE_USER_EMAIL + "', '', 1);")
              .executeUpdate();
    });
  }

  @After
  public void clearDb() {
    transactionalScope.write(() -> {
      Session session = sessionFactory.getCurrentSession();
      session.createNativeQuery("DELETE FROM users").executeUpdate();
      session.createNativeQuery("DELETE FROM steps").executeUpdate();
      session.createNativeQuery("DELETE FROM paragraphs").executeUpdate();
      session.createNativeQuery("DELETE FROM chapters").executeUpdate();
    });
  }

  @Test
  public void checkContentStatus() {
    Response response = executeGet("/content");
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
  }

  @Test
  public void checkContentData() throws JsonProcessingException {

    ShortParagraphDto shortParagraphDto1 = new ShortParagraphDto();
    shortParagraphDto1.setId(1);
    shortParagraphDto1.setName("par 1");
    ShortParagraphDto shortParagraphDto2 = new ShortParagraphDto();
    shortParagraphDto2.setId(2);
    shortParagraphDto2.setName("par 2");

    ChapterDto chapterDto1 = new ChapterDto();
    chapterDto1.setId(1);
    chapterDto1.setName("chapter 1");
    chapterDto1.setParagraphs(List.of(shortParagraphDto1, shortParagraphDto2));
    chapterDto1.setCurrent(true);
    chapterDto1.setCurrentStep(1);

    ShortParagraphDto shortParagraphDto3 = new ShortParagraphDto();
    shortParagraphDto3.setId(3);
    shortParagraphDto3.setName("par 1");

    ChapterDto chapterDto2 = new ChapterDto();
    chapterDto2.setId(2);
    chapterDto2.setName("chapter 2");
    chapterDto2.setParagraphs(List.of(shortParagraphDto3));

    Response response = executeGet("/content");
    List<ChapterDto> dataFromDB = response.readEntity(new GenericType<List<ChapterDto>>(){});

    assertThat(dataFromDB, containsInAnyOrder(chapterDto2, chapterDto1));
  }
}
